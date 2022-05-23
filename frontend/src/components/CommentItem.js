import React from "react";

const CommentItem = ({comment}) => {
    return (
        <div>
            <hr/>
            <p><strong>Время:</strong> {comment.date}</p>
            <p><a href="#"><strong>{comment.user}</strong></a></p>
            <p>{comment.text}</p>
        </div>
    )
}

export default CommentItem
