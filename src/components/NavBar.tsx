import { useAuthenticator } from '@aws-amplify/ui-react'
import { useRouter } from 'next/router'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import Offcanvas from 'react-bootstrap/Offcanvas'

const NavBar = () => {
    const router = useRouter()
    const { route } = useAuthenticator((context) => [context.route])
    const { signOut } = useAuthenticator()

    const navigate = (path: string) => {
        return () => router.push(path)
    }
    return (
        <Navbar bg="light" expand="sm">
            <Container fluid>
                <Navbar.Brand href="#" onClick={navigate('/')}>
                    MASKES
                </Navbar.Brand>
                <Navbar.Toggle />
                <Navbar.Offcanvas placement="end">
                    <Offcanvas.Header closeButton>
                        <Offcanvas.Title>MASKES</Offcanvas.Title>
                    </Offcanvas.Header>
                    <Offcanvas.Body>
                        <Nav className="justify-content-start flex-grow-1 pe-3">
                            <Nav.Link onClick={navigate('/')}>Home</Nav.Link>
                            <Nav.Link onClick={navigate('/requests')}>
                                Requests
                            </Nav.Link>
                            <Nav.Link onClick={navigate('/volunteer')}>
                                Volunteer
                            </Nav.Link>
                        </Nav>
                        <div className="d-flex">
                            {route === 'authenticated' && (
                                <Button onClick={signOut}>Logout</Button>
                            )}
                        </div>
                    </Offcanvas.Body>
                </Navbar.Offcanvas>
            </Container>
        </Navbar>
    )
}

export default NavBar
