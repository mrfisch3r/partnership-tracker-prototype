import React, { useState } from 'react';

const CommentsSection = ({ partner, onClose }) => {
  let initialComments;
  
  //TODO: replace these hardcoded dummy comments with data from Flask backend
  if (partner.id === 1) {
    initialComments = [
      {
        id: 1,
        contactedBy: 'Alice Johnson',
        contactName: 'Alice Johnson',
        comment: 'Left a voicemail regarding upcoming event.',
        date: '2025-01-12'
      },
      {
        id: 2,
        contactedBy: 'Bob Smith',
        contactName: 'Bob Smith',
        comment: 'Scheduled a meeting for next week.',
        date: '2025-01-10'
      }
    ];
  } else if (partner.id === 2) {
    initialComments = [
      {
        id: 1,
        contactedBy: 'Charlie Brown',
        contactName: 'Charlie Brown',
        comment: 'Discussed partnership details over email.',
        date: '2025-01-08'
      }
    ];
  } else if (partner.id === 3) {
    initialComments = [
      {
        id: 1,
        contactedBy: 'Dana White',
        contactName: 'Dana White',
        comment: 'Left a message regarding contract renewal.',
        date: '2025-01-11'
      },
      {
        id: 2,
        contactedBy: 'Evan Davis',
        contactName: 'Evan Davis',
        comment: 'Confirmed meeting time for next week.',
        date: '2025-01-09'
      }
    ];
  } else {
    initialComments = [];
  }

  const [comments, setComments] = useState(initialComments);
  const [newComment, setNewComment] = useState('');

  const handleAddComment = () => {
    if (!window.confirm("Is the information correct?")) {
      return;
    }
    
    //TODO: replace this dummy logic with an API call to Flask backend to save the new comment
    
    //default to using the first contact from the partner's contacts
    const defaultContact = partner.contacts && partner.contacts.length > 0
      ? partner.contacts[0]
      : { name: 'Unknown' };
    const newEntry = {
      id: comments.length + 1,
      contactedBy: defaultContact.name,
      contactName: defaultContact.name,
      comment: newComment,
      date: new Date().toISOString().split('T')[0] // Format: YYYY-MM-DD
    };
    setComments([newEntry, ...comments]);
    setNewComment('');
    onClose();
  };

  return (
    <div className="comments-section">
      <button className="close-button" onClick={onClose}>X</button>
      <h3>Comments for {partner.name}</h3>
      <table>
        <thead>
          <tr>
            <th>Contacted By</th>
            <th>Contact Name</th>
            <th>Comments</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {comments.map((entry) => (
            <tr key={entry.id}>
              <td>{entry.contactedBy}</td>
              <td>{entry.contactName}</td>
              <td>{entry.comment}</td>
              <td>{entry.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="new-comment">
        <textarea
          placeholder="Add a comment..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          onInput={(e) => {
            e.target.style.height = 'auto';
            e.target.style.height = e.target.scrollHeight + 'px';
          }}
          style={{ minHeight: '100px', resize: 'none', width: '100%' }}
        ></textarea>
        <button onClick={handleAddComment}>Submit Comment</button>
      </div>
    </div>
  );
};

export default CommentsSection;
