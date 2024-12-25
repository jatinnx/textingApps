
import User from "../../../models/users.model";
import { connectDB } from "../../../db/dbConfis";


export const GET = async (request) => {
    try {
        await connectDB();
        
        // Get search query from URL if present
        const url = new URL(request.url);
        const searchQuery = url.searchParams.get('search');
        
        let query = {};
        if (searchQuery) {
            query = {
                $or: [
                    { username: { $regex: searchQuery, $options: 'i' } },
                    { email: { $regex: searchQuery, $options: 'i' } }
                ]
            };
        }

        const users = await User.find(query).select('-password'); // Exclude password from results
        console.log("app/api/user/route.js:  Fetched users:", users.length);
        
        return new Response(JSON.stringify(users), { 
            status: 200,
            headers: {
                'Content-Type': 'application/json'
            }
        });
    } catch (error) {
        console.error("Error fetching users:", error);
        return new Response(JSON.stringify({ error: "Failed to fetch users" }), { 
            status: 500,
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }
}