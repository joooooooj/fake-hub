import React, {useEffect, useState} from "react";

export default function Insights(props) {

    const [insights, setInsights] = useState(null);


    useEffect(() => {
        if (props?.match?.params?.id) {

            console.log(props?.match?.params?.id)

            fetch('/api/commit/' + props?.match?.params?.id+'/insights', {

                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            })
                .then(response => response.json())
                .then(data => {
                    setInsights(data);
                    console.log('Success:', data);
                })
                .catch((error) => {
                    console.error('Error:', error);
                });
        }
    }, [props?.match?.params.id])

    return (
        <div>

        </div>
    );
}