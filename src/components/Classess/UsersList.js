// UserList.js
import React from 'react';
import { ListGroup, Button, Row, Col } from 'react-bootstrap';
import PropTypes from 'prop-types';

const UserList = ({ currentUser, users, onFollow, onUnfollow, onBlock, onUnblock }) => {
    return (
        <ListGroup>
            {users.map(user => (
                <ListGroup.Item key={user.id}>
                    <Row className="align-items-center">
                        <Col xs={6}>
                            <div>{user.username}</div>
                            <div>{user.name}</div>
                        </Col>
                        <Col xs={6} className="d-flex justify-content-end">
                            {onFollow  && !user.isBlocked && (
                                <Button
                                    variant="primary"
                                    onClick={() => onFollow(currentUser,user.id)}
                                    className="mr-2"
                                >
                                    Follow
                                </Button>
                            )}
                            {onUnfollow  && !user.isBlocked && (
                                <Button
                                    variant="danger"
                                    onClick={() => onUnfollow(currentUser,user.id)}
                                    className="mr-2"
                                >
                                    Unfollow
                                </Button>
                            )}
                            {onBlock && !user.isBlocked && (
                                <Button
                                    variant="warning"
                                    onClick={() => onBlock(currentUser,user.id)}
                                >
                                    Block
                                </Button>
                            )}
                            {onUnblock && (
                                <Button
                                    variant="secondary"
                                    onClick={() => onUnblock(currentUser,user.id)}
                                >
                                    Unblock
                                </Button>
                            )}
                        </Col>
                    </Row>
                </ListGroup.Item>
            ))}
        </ListGroup>
    );
};

UserList.propTypes = {
    users: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number.isRequired,
        username: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        isFollowing: PropTypes.bool,
        isBlocked: PropTypes.bool,
    })).isRequired,
    onFollow: PropTypes.func,
    onUnfollow: PropTypes.func,
    onBlock: PropTypes.func,
    onUnblock: PropTypes.func,
};

export default UserList;
