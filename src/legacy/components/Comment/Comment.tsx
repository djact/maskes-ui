import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { Comment as CommentSUI, Form } from 'semantic-ui-react'
import { Button as BSButton } from 'react-bootstrap'
import { FiChevronDown } from 'react-icons/fi'
import { BsPencil, BsXSquare } from 'react-icons/bs'
import moment from 'moment'
import Aux from '../../hoc/Aux/Aux'
import './Comment.css'
import Replies from '../../containers/Replies/Replies'

interface ISingleComment {
    id: string
    author: string
    author_name: string
    author_image: string
    comment_content: string
    reply_count: number
    created_date: string
}

interface IComment {
    comment: ISingleComment
    update: any
    userId: string
    setDeleteCommentId: any
    setShowDeleteModal: any
}

const Comment = (props: IComment) => {
    const { comment, update, userId, setDeleteCommentId, setShowDeleteModal } =
        props

    const history = useHistory()

    //Edit Comment Form
    const [onEdit, setOnEdit] = useState(false)
    const toggleEditor = () => {
        setOnEdit(!onEdit)
    }

    const [commentContent, setCommentContent] = useState(
        comment && comment.comment_content ? comment.comment_content : ''
    )
    const onChangeComment = (e) => {
        setCommentContent(e.target.value)
    }

    //Show/unshow replies
    const [collapsedReplies, setCollapsedReplies] = useState(true)
    const toggleColapsed = () => {
        setCollapsedReplies(!collapsedReplies)
    }

    const edit_button = <BsPencil />
    const delete_button = <BsXSquare />

    return (
        comment && (
            <Aux>
                <CommentSUI>
                    <CommentSUI.Avatar as="a" src={comment.author_image} />
                    <CommentSUI.Content>
                        <CommentSUI.Author
                            as="a"
                            onClick={() =>
                                history.push(`/profile/${comment.author}`)
                            }
                        >
                            {comment.author_name}
                        </CommentSUI.Author>
                        <CommentSUI.Metadata>
                            <span>
                                {moment(comment.created_date).fromNow()}
                            </span>
                            {onEdit ? (
                                <CommentSUI.Actions>
                                    <CommentSUI.Action
                                        className="delete-btn"
                                        onClick={() => {
                                            setShowDeleteModal(true)
                                            setDeleteCommentId(comment.id)
                                        }}
                                    >
                                        {delete_button}
                                    </CommentSUI.Action>
                                </CommentSUI.Actions>
                            ) : null}
                        </CommentSUI.Metadata>
                        {!onEdit ? (
                            <Aux>
                                <CommentSUI.Text>
                                    {comment.comment_content}
                                </CommentSUI.Text>
                                <CommentSUI.Actions>
                                    <CommentSUI.Action onClick={toggleColapsed}>
                                        <CommentSUI.Metadata>
                                            {comment.reply_count}{' '}
                                            {comment.reply_count > 1
                                                ? 'Replies'
                                                : 'Reply'}{' '}
                                            {collapsedReplies ? null : (
                                                <FiChevronDown />
                                            )}
                                        </CommentSUI.Metadata>
                                    </CommentSUI.Action>
                                    {userId === comment.author ? (
                                        <CommentSUI.Action
                                            className="edit-btn"
                                            onClick={toggleEditor}
                                        >
                                            {edit_button}
                                        </CommentSUI.Action>
                                    ) : null}
                                </CommentSUI.Actions>
                            </Aux>
                        ) : (
                            <Form
                                reply
                                onSubmit={() =>
                                    update(comment.id, commentContent)
                                }
                            >
                                <Form.TextArea
                                    style={{ height: 60, marginTop: -10 }}
                                    onChange={onChangeComment}
                                    value={commentContent}
                                />
                                <BSButton
                                    type="submit"
                                    size="sm"
                                    className="mr-2 update-comment-button"
                                >
                                    Update
                                </BSButton>
                                <BSButton
                                    onClick={toggleEditor}
                                    variant="secondary"
                                    size="sm"
                                >
                                    Cancel
                                </BSButton>
                            </Form>
                        )}
                    </CommentSUI.Content>
                    <CommentSUI.Group collapsed={collapsedReplies}>
                        <Replies
                            commentId={comment.id}
                            loadReplies={!collapsedReplies}
                        />
                    </CommentSUI.Group>
                </CommentSUI>
            </Aux>
        )
    )
}

export default Comment
