import React, {useEffect, useState} from 'react';
import {Button} from 'react-bootstrap';

export default function Settings (props) {
  const [repository, setRepository] = useState (null);
  const [user, setUser] = useState (null);

  useEffect (() => {
    if (props?.match?.params?.id) {
      console.log(props)
      setRepository (props?.match?.params?.id);
    }
  }, [props?.match?.params?.id]);

  function deleteRepo () {
    fetch ('http://localhost:8000/api/repository/' + repository, {
      method: 'DELETE',
      headers: new Headers({
        'Authorization': 'Token '+JSON.parse(localStorage.getItem("user")).token, 
      }), 
    })
      .then (response => response.json ())
      .then (data => {
        setRepository (data);
        console.log ('Success:', data);
      })
      .catch (error => {
        console.error ('Error:', error);
      });
  }

  return (
    <div className="settings">
      <div className="dangerZone">
        <div className="text-left "> Delete this repository</div>
        <div className="text-left ">
          {' '}When you delete a repo, it's forever. Make sure you are sure.
        </div>
        <Button
          variant="warning mt-5"
          className="w-25"
          onClick={() => deleteRepo ()}
        >
          Delete repository
        </Button>
      </div>
    </div>
  );
}
