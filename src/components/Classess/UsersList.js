// UserList.js
import React from 'react';
import { ListGroup, Button, Row, Col } from 'react-bootstrap';

const UserList = ({ users, onFollow, onUnfollow }) => {
    return (
        <ListGroup>
            {users.map(user => (
                <ListGroup.Item key={user.id}>
                    <Row className="align-items-center">
                        <Col xs={8}>
                            <div><strong>User ID:</strong> {user.id}</div>
                            <div>{user.description}</div>
                        </Col>
                        <Col xs={4} className="d-flex justify-content-end">
                            {user.isFollowing ? (
                                <Button
                                    variant="danger"
                                    onClick={() => onUnfollow(user.id)}
                                >
                                    Following
                                </Button>
                            ) : (
                                <Button
                                    variant="primary"
                                    onClick={() => onFollow(user.id)}
                                >
                                    Follow
                                </Button>
                            )}
                        </Col>
                    </Row>
                </ListGroup.Item>
            ))}
        </ListGroup>
    );
};

export default UserList;
