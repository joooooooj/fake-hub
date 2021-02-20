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

    const series2 = React.useMemo(
        () => ({
            type: "bar"
        }),
        []
    );
    const axes2 = React.useMemo(
        () => [
            {primary: true, type: "ordinal", position: "left"},
            {position: "bottom", type: "linear", stacked: true}
        ],
        []
    );

    const series3 = React.useMemo(
        () => ({
            type: "bar"
        }),
        []
    );
    const axes3 = React.useMemo(
        () => [
            {primary: true, type: "ordinal", position: "bottom"},
            {position: "left", type: "linear", stacked: true}
        ],
        []
    );

    const [data, setData] = useState([
        {
            label: ' ',
            data: []
        }])

    const [counts, setCounts] = useState([])

    const [taskCounts, setTaskCounts] = useState([])

    const [taskInfo, setTaskInfo] = useState([])

    const [comSum, setComSum] = useState(0)

    const [contrib, setContrib] = useState(0)


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

                    const newIns = []
                    let contrib = 0
                    for (let d of data.colab) {
                        contrib = contrib + 1
                        const label = d
                        const commits = []
                        for (let i of data.info) {
                            if (i.author?.username === d) {
                                console.log(i)
                                let found = false
                                for (let com of commits) {
                                    console.log(com)
                                    if (com.x.getDay() === (new Date(i.committed_at)).getDay() && com.x.getMonth() === (new Date(i.committed_at)).getMonth()) {
                                        com.y = com.y + 1
                                        found = true
                                        break

                                    }

                                }
                                if (!found) {
                                    commits.push({
                                        x: new Date(i.committed_at),
                                        y: 1
                                    })
                                }
                                console.log(commits)

                            }
                        }
                        newIns.push({
                            label: label,
                            data: commits
                        })

                    }
                    console.log(newIns)
                    setData(newIns)
                    setContrib(contrib)
                })
                .catch((error) => {
                    console.error('Error:', error);
                });
        }

        fetch('/api/task/' + props?.match?.params?.id + '/counts', {

            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        })
            .then(response => response.json())
            .then(data => {
                console.log(data)

                let temp = [{
                    x: 'Open',
                    y: 0
                },
                    {
                        x: 'Closed',
                        y: 0
                    }
                ]
                for (let d of data)
                    for (let t of temp)
                        if (d[0] === t.x)
                            t.y = d[1]

                setTaskCounts([{
                    data: temp,
                    label: 'task count',
                }])
                setTaskInfo(temp)
            })
            .catch((error) => {
                console.error('Error:', error);
            });

        fetch('/api/commit/' + props?.match?.params?.id + '/counts', {

            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        })
            .then(response => response.json())
            .then(data => {
                console.log(data)
                let sum = 0
                let temp = []
                for (let d of data) {
                    temp.push({
                        x: d[0],
                        y: d[1]
                    })
                    sum = d[1] + sum
                }
                setComSum(sum)
                setCounts([{
                    data: temp,
                    color: '#ffff4d',
                    label: 'commit count'
                }])
            })
            .catch((error) => {
                console.error('Error:', error);
            });


    }, [props?.match?.params.id])


    return (
        <div className="m-5">
            <div

            >
                <h3 className="text-center">Commit history</h3>
                <div style={{
                    width: '90%',
                    height: '320px',
                    margin: '50px'

                }} className="text-center">

                    < Chart data={data} series={series} axes={axes} tooltip style={{overflow: "visible"}}/>
                </div>

            </div>
            <div className="m-5">
                <h3 className="text-center">Commit count</h3>
                <div className="text-center"> This repo has {comSum} total commits by {contrib} authors.</div>
                <div style={{
                    width: '90%',
                    height: '400px',
                    margin: '50px'

                }} className="text-center">


                    <Chart data={counts} series={series2} axes={axes2} tooltip style={{overflow: "visible"}}/>
                </div>
            </div>
            <div className="m-5">
            <div className="text-center">
                <h3>Task count</h3>
                This repo has
                {
                    taskInfo?.map((order, index) => (

                        <span key={index}>
                        {index !== 0 &&
                        <span> and </span>
                        }
                            {index === 0 &&
                            <span> </span>
                            }
                            <span>{order.y} {order.x}
                        </span>
                        </span>
                    ))
                }
                <span> tasks.</span>
            </div>

                <div style={{
                    width: '90%',
                    height: '250px',
                    margin: '50px'

                }} className="text-center">


                    <Chart data={taskCounts} series={series3} axes={axes3} tooltip style={{overflow: "visible"}}/>
                </div>

            </div>


        </div>

    );


}