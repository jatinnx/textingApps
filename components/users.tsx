'use client'

import { useState, useEffect } from 'react'
import { Input } from "@/components/ui/input"
import { Button } from './ui/button'
import { Card, CardContent } from "./ui/card"
import { useDebounce } from 'use-debounce'

interface User {
  _id: string;
  username: string;
  email: string;
  createdAt: string;
}

const Users = ( { chatSelect, setChatSelect, setUser } : { chatSelect: boolean, setChatSelect: React.Dispatch<React.SetStateAction<boolean>>, setUser: React.Dispatch<React.SetStateAction<string | null>> } ) => {

  const [searchTerm, setSearchTerm] = useState("")
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Debounce search term to avoid too many API calls
  const [debouncedSearch] = useDebounce(searchTerm, 500)

  const handelMessage = (user: User) => {
    setChatSelect(true)
    setUser(user.username)
    console.log("user :  ",user);
  }

  const fetchUsers = async (search?: string) => {
    try {
      setLoading(true)
      setError(null)
      const queryString = search ? `?search=${encodeURIComponent(search)}` : ''
      const response = await fetch(`/api/user${queryString}`)

      if (!response.ok) {
        throw new Error('Failed to fetch users')
      }

      const data = await response.json()
      console.log(data);
      
      setUsers(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchUsers(debouncedSearch)
  }, [debouncedSearch])

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <div className="flex gap-2 mb-6">
        <Input
          type="text"
          placeholder="Search by Username"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-md"
        />
        <Button
          onClick={() => fetchUsers(searchTerm)}
          disabled={loading}
        >
          {loading ? 'Searching...' : 'Search'}
        </Button>
      </div>

      {error && (
        <div className="text-red-500 mb-4">{error}</div>
      )}

      <main className="flex flex-col gap-4">
        {users.map((user) => (
          <Card key={user._id}>
            <CardContent className="p-4">
              <h3 className="font-semibold text-lg mb-2">{user.username}</h3>
              <p className="text-sm text-gray-600">{user.email}</p>
              <div className='flex justify-between'>
                <p className="text-xs text-gray-400 mt-2">
                  Joined: {new Date(user.createdAt).toLocaleDateString()}
                </p>
                <button className="bg-blue-500 text-white text-xs  w-auto p-1 rounded-md"
                  // onClick={() => window.location.href = `/chat?userId=${user._id}`}
                  onClick={() => handelMessage(user)}
                > Message </button>
              </div>
            </CardContent>
          </Card>
        ))}

        {!loading && users.length === 0 && (
          <div className="col-span-full text-center text-gray-500">
            No users found
          </div>
        )}
      </main>
    </div>
  )
}

export default Users