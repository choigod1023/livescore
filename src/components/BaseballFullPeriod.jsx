

const periodFullComponent = (props) => {
    let data = props.data.axios_data
    return (
        <>
            {
                Object.values(data).map((item, idx) => {
                    console.log("hi : " + item)
                    return (
                        Object.values(item).map((item1, idx1) => {
                            // console.log(item1.eventType);
                            if (item1.eventType === "PERIOD_INFO") {
                                console.log('hi')
                                return (
                                    <div>
                                        <hr />
                                        <h1>{item1.playText}</h1>
                                    </div>
                                )
                            }
                            else {
                                return (
                                    <div>{item1.playText}</div>
                                )
                            }
                        }))

                })
            }
        </>
    )
}

export default periodFullComponent;