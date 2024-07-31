// UserList.js
import React from 'react';
import { ListGroup, Button, Row, Col } from 'react-bootstrap';
import PropTypes from 'prop-types';

const UserList = ({ users, onFollow, onUnfollow, onBlock, onUnblock }) => {
    return (
        <ListGroup>
            {users.map(user => (
                <ListGroup.Item key={user.id}>
                    <Row className="align-items-center">
                        <Col xs={6}>
                            <div><strong>User ID:</strong> {user.id}</div>
                            <div>{user.description}</div>
                        </Col>
                        <Col xs={6} className="d-flex justify-content-end">
                            {onFollow && onUnfollow && (
                                <>
                                    {user.isFollowing ? (
                                        <Button
                                            variant="danger"
                                            onClick={() => onUnfollow(user.id)}
                                            className="mr-2"
                                        >
                                            Unfollow
                                        </Button>
                                    ) : (
                                        <Button
                                            variant="primary"
                                            onClick={() => onFollow(user.id)}
                                            className="mr-2"
                                        >
                                            Follow
                                        </Button>
                                    )}
                                    <Button
                                        variant="warning"
                                        onClick={() => onBlock(user.id)}
                                    >
                                        Block
                                    </Button>
                                </>
                            )}
                            {onUnblock && (
                                <Button
                                    variant="secondary"
                                    onClick={() => onUnblock(user.id)}
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
        description: PropTypes.string.isRequired,
        isFollowing: PropTypes.bool.isRequired,
        isBlocked: PropTypes.bool.isRequired,
    })).isRequired,
    onFollow: PropTypes.func,
    onUnfollow: PropTypes.func,
    onBlock: PropTypes.func,
    onUnblock: PropTypes.func,
};

export default UserList;
