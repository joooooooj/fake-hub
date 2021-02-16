import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";

export default function Home() {
    const history = useHistory();

    return (
        <div className="home">
            <Container>
                <Row>
                    <Col>
                        <img src="./25231.png" />
                    </Col>
                    <Col>
                        <h1>Where the world leaves GitHub behind</h1>
                        <p>Millions of developers and companies build, ship, and maintain their software on GitHub—the largest and most advanced development platform in the world.</p>
                        <p className="text-danger font-weight-bold">But when GitHub fails, they come to us!</p>
                        <Button variant="warning" className="w-100" onClick={() => history.push('/register')}>
                            SIGN UP
                        </Button>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}