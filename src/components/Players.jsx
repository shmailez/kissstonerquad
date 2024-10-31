import { useState } from "react";
import {playersArray} from '../db/playersArray.js'
import './Players.css'

const Players = (props) => {

    const [players] = useState(playersArray);

    return  <>
                <div className="players-circle">
                    {players.map((player, index) => {
                        return (   
                        <div
                            key={player.id}
                            // eslint-disable-next-line react/prop-types
                            className={`player-circle ${player.index} ${index === props.activePlayerIndex ? 'active' : ''} ${index === props.targetPlayerIndex ? 'target' : ''} ${props.isKissing && (index === props.activePlayerIndex || index === props.targetPlayerIndex) ? 'kissing' : ''}`}
                        
                        >
                            <img src={`/public/${player.id}.png`} alt={player.id} />
                        </div>
                        );
                    })}
                </div>
            </>
}

export default Players