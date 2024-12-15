import MatchService from "@/services/MatchService";
import { Match } from "@/types";
import { useState } from "react";

const Table: React.FC = () => {
    const [matches, setMatches] = useState<Array<Match>>([]);

    const getMatches = async () => {
        const data = await MatchService.getAllMatches();
        console.log(data);

        if (data) {
            setMatches(data);
        } else {
            console.log("No data found");
        }
    }

    return (
        <div>
        <h1>Table</h1>
        </div>
    );
}

export default Table;