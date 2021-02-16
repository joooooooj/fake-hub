import React, { useEffect } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import Repositories from "../repositories/Repositories";
import Teams from "../teams/Teams";
import logo from "../../assets/25231-tr.png";

export default function Home(props) {
    const history = useHistory();

    return (
        <>
            {!props.user &&
                <div className="home">
                    <Container>
                        < Row >
                            <Col>
<<<<<<< HEAD
                                <img src="./25231-tr.png" />
=======
                                <img src={logo} />
>>>>>>> a1a6fb8c51528c400e04dfc640f8d82a4c29813f
                            </Col>
                            <Col>
                                <h1>Where the world leaves GitHub behind</h1>
                                <p>Millions of developers and companies build, ship, and maintain their software on GitHub—the largest and most advanced development platform in the world.</p>
                                <p className="text-danger font-weight-bold">But when GitHub fails, they come to us!</p>
                                <Button variant="warning" className="w-100" onClick={() => history.push('/template/register')}>
                                    SIGN UP
                        </Button>
                            </Col>
                        </Row>
                    </Container>
                </div >
            }
            {props.user &&
                <>
                    <Repositories user={props.user} />
                    <Teams user={props.user} />
                </>
            }
        </>
    );
}