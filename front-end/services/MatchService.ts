const API = process.env.NEXT_PUBLIC_API_URL;


const getAllMatches = async () => {
    const token = JSON.parse(sessionStorage.getItem("token") || "")?.token;
    const response = await fetch(API + "/matches", {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    });
    return await response
}


const MatchService = {
    getAllMatches
}

export default MatchService