import React, {useEffect, useState} from "react";
import {Chart} from 'react-charts'
import ReactDOM from "react-dom";

export default function Insights(props) {


    const series = React.useMemo(
        () => ({
            showPoints: true,
        }),
        []
    )

    const axes = React.useMemo(
        () => [
            {primary: true, type: 'time', position: 'bottom'},
            {type: 'linear', position: 'left'}
        ],
        []
    )

    const [data, setData] = useState([
        {
            label: 'ja',
            data: []
        }])

    const [counts, setCounts] = useState([])


    useEffect(() => {

        console.log(props)

        if (props?.match?.params?.id) {

            console.log(props?.match?.params?.id)

            fetch('/api/commit/' + props?.match?.params?.id + '/insights', {

                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            })
                .then(response => response.json())
                .then(data => {
                    console.log(data.info)
                    // newIns.push({
                    //     label: d,
                    //     data: [{
                    //         x: new Date("Thu Feb 18 2021 13:00:00 GMT+0100 (Central European Standard Time)"),
                    //         y: 15
                    //     }, {
                    //         x: new Date("Thu Feb 20 2021 13:00:00 GMT+0100 (Central European Standard Time)"),
                    //         y: 18
                    //     }]
                    // })

                    const newIns = []
                    for (let d of data.colab) {
                        const label = d
                        const commits = []
                        for (let i of data.info) {
                            if (i.author?.username === d) {
                                commits.push({
                                    x: new Date(i.committed_at),
                                    y: Math.random() * Math.floor(10)
                                })

                            }


                        }
                        newIns.push({
                            label: label,
                            data: commits
                        })

                    }
                    console.log(newIns)
                    setData(newIns)
                })
                .catch((error) => {
                    console.error('Error:', error);
                });
        }

        fetch('/api/commit/' + props?.match?.params?.id + '/counts', {

            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        })
            .then(response => response.json())
            .then(data => {
                console.log(data)

                let temp = []
                for (let d of data)
                    temp.push({
                        x: d[0],
                        y: d[1]
                    })

                setCounts([{
                    data: temp
                }])
            })
            .catch((error) => {
                console.error('Error:', error);
            });


    }, [props?.match?.params.id])

    const series2 = React.useMemo(
        () => ({
            type: "bar"
        }),
        []
    );
    const axes2 = React.useMemo(
        () => [
            {primary: true, type: "ordinal", position: "bottom"},
            {position: "left", type: "linear", stacked: true}
        ],
        []
    );

    return (
        <>
            <div
                style={{
                    width: '90%',
                    height: '320px',

                }} className="m-5"
            >
                <h3>Commit history</h3>
                <Chart data={data} series={series} axes={axes} tooltip/>

            </div>
            <div style={{
                width: '90%',
                height: '320px',

            }} className="m-5">
                <h3>Commit count</h3>
                <Chart data={counts} series={series2} axes={axes2} tooltip/>
            </div>
        </>

    );


}