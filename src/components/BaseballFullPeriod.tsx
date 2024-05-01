
import styled from "styled-components";
import React from 'react'

const PeriodStyle = styled.div`
border:1px solid black;
`
const periodFullComponent = (props) => {
    let data = props.data


    console.log("check")
    console.log(data)
    let inning_data = data.inning_data;
    if (inning_data === undefined) {
        return (<div>중계를 제공할 수 없습니다.</div>)

    }
    else {

        return (
            <>
                {

                    inning_data.map((item, idx) => {
                        if (item.eventType === "PERIOD_INFO") {
                            return (
                                <div>
                                    <hr />
                                    <h2>{item.playText}</h2>
                                    <hr />
                                </div>
                            )
                        }

                        return (<div>{item.eventType === "PLAYER_INTRODUCTION" ? <h3>{item.playText}</h3> : <div>{item.playText}</div>}</div >);

                    })
                }
            </>
        )
    }

}

export default periodFullComponent;