import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import {Button, Form, Row} from 'react-bootstrap';
import Select from 'react-select';

export default function NewRepo (props) {
  const [user, setUser] = useState (null);
  const [userTeams, setUserTeams] = useState (null);

  useEffect (() => {
    fetch (
      'http://localhost:8000/user/' +
        JSON.parse (localStorage.getItem ('user')).id,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )
      .then (response => response.json ())
      .then (data => {
        setUser (data);
        console.log ('Success:', data);
      })
      .catch (error => {
        console.error ('Error:', error);
      });

      fetch (
        'http://localhost:8000/team/' +
          JSON.parse (localStorage.getItem ('user')).id+
          '/user',
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      )
        .then (response => response.json ())
        .then (data => {
          setUser (data);
          console.log ('Success:', data);
        })
        .catch (error => {
          console.error ('Error:', error);
        });
  }, []);

  const createRepo = () => {
    fetch ('http://localhost:8000/repository/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Token ' +
          JSON.parse (localStorage.getItem ('user')).token,
      },
    })
      .then (response => response.json ())
      .then (data => {
        console.log ('Success:', data);
      })
      .catch (error => {
        console.error ('Error:', error);
      });
  };
  return (
    <div className="w-100 text-center">
      <div style={{maxWidth: '1000px', 'margin': '0 auto'}}>
    

      <div>
        <Form className="w-100 d-block" style={{"padding": "0 50px 100px"}}>
          <Form.Group className="text-left">
               
            <div className="w-100 text-left" style={{fontSize: "36px"}}> Create a new repository</div>
            
            <div className="w-100 text-left" style={{fontSize: "20px"}}>Repository contains stuff.</div>

            <Form.Label className="mt-5">Owner</Form.Label>
            <div className="d-flex">
                <Select id="inputState" className="w-50 text-light bg-dark"
                    options={"owners"} style={{'inputState::after': '/'}}
                    name="owner"
              />
              <span style={{fontSize: "20px", marginLeft: "20px"}}>/</span>
            </div>
            <Form.Label>Repository name</Form.Label>
            <Form.Control type="text" className="w-50 text-light bg-light"
                          style={{'height': '40px', 'borderRadius': '10px', marginTop: '5px'}}
                          name="name"/>

            <Form.Label>Description</Form.Label>
            <Form.Control type="text" className="w-100 text-light bg-light"
                          style={{'height': '40px', 'borderRadius': '10px', marginTop: '5px'}}
                          name="description"/>
            
           
            </Form.Group>
        </Form>
      </div>
      </div>
    </div>
  );
}
