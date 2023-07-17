import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const ReadReview = ()=>{
    const params = useParams();
    let [count, setCount] = useState(0);
    const [oldComment, setOldComment] = useState("");
    const [curID, setCurID] = useState("");
    const navigate = useNavigate();
    const [makeVisible, setMakeVisible] = useState(false);
    const [data, setData] = useState([]);
    const [comment,setComment] = useState("");
    const [allComments, setAllComments] = useState([]);
    let [likes, setLikes] = useState(0);
    const [reply, setReply] = useState("");

    let auth = localStorage.getItem("user");
    auth = JSON.parse(auth);
    let person = auth._id;

    useEffect(()=>{
        getItem();
    }, []);

    useEffect(()=>{
        getComments();
    },[])

    const commentedIn = params.id;

    const getItem = async ()=>{
        let result = await fetch(`http://localhost:5000/get-upload/${params.id}`);
        if(result){
            result = await result.json();
            // console.log(result);
            setData(result);
        }  
    }

    const postComment = async()=>{
        const commentedOn = new Date();
        let result = await fetch("http://localhost:5000/comment",{
            method:"post",
            body:JSON.stringify({comment, person, commentedOn, commentedIn, likes}),
                headers:{
                    'Content-type': 'application/json',
                }
        });
        if(result){
            result = await result.json();
            getComments();
            setComment("");
        }
        else{
            console.log("Comment not posted");
        }
    }

    const getComments = async ()=>{
        let result = await fetch(`http://localhost:5000/comment/${commentedIn}`);
        if(result){
            result = await result.json();
            setAllComments(result);
        }
        else{
            console.log("Couldn't fetch comments");
        }

    }

    const increaseLikeCount = async(id)=>{
        count = count+1;
        setCount(count);
        if(count%2===0 && likes>0){
            likes = likes-1;
        }
        else{
            likes=likes+1;
        }
        setLikes(likes);
        let result = await fetch(`http://localhost:5000/postLikes/${id.target.id}`,{
            method:"put",
            body:JSON.stringify({likes}),
            headers:{
                'Content-type': 'application/json',
            }
        })
        if(result){
            result = await result.json();
            getComments();
        }
    }

    const deleteComment = async(pid,id)=>{
        if(person===pid){
            let result = await fetch(`http://localhost:5000/deleteComment/${id}`,{
            method:"delete"
        });
        getComments();
        }
    }

    const editComment = async (pid, cid)=>{
        if(person===pid){
            let result = await fetch(`http://localhost:5000/getIndividualComment/${cid}`);
            if(result){
                result = await result.json();
                setOldComment(result.comment);
                setCurID(result._id);
            }
        }
        
    }

    const updateComment = async (cid, rid)=>{
        console.log(cid);
        let result = await fetch(`http://localhost:5000/editComment/${cid}`,{
            method:"put",
            body:JSON.stringify({oldComment}),
            headers:{
                'Content-type':'application/json'
            }
        })
        getComments();
        navigate("/read-review/"+rid);
    }

    const makeCommentChangeVisible = (cid)=>{
        setCurID(cid);
        setMakeVisible(!makeVisible);
    }

    const postReply = async(cid)=>{
        console.log(cid);
    }

    const clear = ()=>{
        setComment("");
    }

    return(
        <div className="review-container review-card">
            <div className="review-card">
            <h1>{data.name}</h1>
            <p className="review-card-username">By {data.username}</p>
            <p>{data.city}, {data.state}</p>
            <p>{data.attractions}</p>
            <p>{data.description}</p>
            <p>{data.days}</p>
            <p>{data.budget}</p>
            <p><a href="#">View photos</a></p>
        </div>
        <p>{data.review}</p>
        <p>Comments</p>
        <img src="https://w7.pngwing.com/pngs/81/570/png-transparent-profile-logo-computer-icons-user-user-blue-heroes-logo-thumbnail.png" className="sender-image" alt="sender"></img>
                    
        <input type="text" className="inputBox comment-input" placeholder="Add a comment..." onChange={(e)=>setComment(e.target.value)} value={comment}></input>
        <div className="add-comment-buttons">
        <button className="btn btn-read-cancel" onClick={clear}>Cancel</button>
        <button className="btn btn-read-comment" onClick={postComment}>Comment</button>
        </div>
        <hr></hr>
        <br></br>
        <br></br>
        {allComments.length>0 ?
        <div>
            {allComments.map((Comment, index)=>{
                return(
                    <div key={index} id={Comment._id} className="comment-container">
                        
                    <img src="https://w7.pngwing.com/pngs/81/570/png-transparent-profile-logo-computer-icons-user-user-blue-heroes-logo-thumbnail.png" className="sender-image" alt="sender"></img>
                    <button className="hide"><img onClick={()=>makeCommentChangeVisible(Comment._id)} className="setting-img" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAdVBMVEX///8AAACqqqr8/PzW1tbNzc0VFRWfn5/ExMS9vb1wcHCsrKx2dnb4+PhfX1+ioqLs7OyQkJBNTU2ZmZl9fX2IiIjh4eFmZmZra2vPz88lJSXg4ODV1dWzs7MwMDBUVFRCQkI7OzsgICAtLS0LCwsbGxs/Pz8Lp86QAAAEzUlEQVR4nO3diXbiMAwF0DihlB3KWihraef/P3FIOxRI7NjPcKrzMro/MNLpxBaOpSTJb8nWaW/8aYz5HPfSRvZr/+5v2QzMrcFGOqRH6s+MzawvHdijPFvzy6XSoT3EeuVM0Jjtm3R495tU5JcbSgd4r1dPgsZMpUO8z86boDEL6SDvUdwi7HrSYcazbxJlE+lAY7UDEzTmSTrUOKPgBI3h3PtDVpkzykexBSRoDOPOf4Ay3EmHi1tCCRozlw4YFrYVXtCVNn0wQWOkI0Zt4AzZ9sQFnOFMOmRQE85wLx0yBqlnzrgOp54iMhxJBw0JL7ovuJYa9+GTW0s6aEhMhl3poCFpRIZcZ1L4hm8M1yE49tPpG9dz2IjIsCEdNAQvvNl2/GQLJ3iQDhnUgzNk+4GIFzVcC02SZHCG0hHD/K9kbvGdJ6L7BeFx4hhKcCAdbgTsj8h3mHjSARJk2yq+AXVNUzrWSOFHGWvpUGO9BCbI9cvwRljtxnZSeiNkteFcZX74X+XTvsQ/63oSbEsHeL/5oSK/MdcxsMvQmSDX4VOF7Nn2ouZYj5uJZ63i67beUjqkh8sa3eni9Ex+7BezDeFvJaWUUkoppZRSSimllFJKKaWUUv+Z0bKdpml7WY8rJkXzdHC5kNEcpJRXZt36aXlY1LFL1iRTxdWNSHzr8kbrw3knqsnVGWuXVXfmd6Tju9vc15i/Il9YQ1oSqFfVsJ4L4hRDJytwTok6yd4DM9xKRxorfAgPX+PaF6TJkvOyKZAgZ1tQaMPMN8Ib0Wi/unS8OHT2B1/fBTpGaS8dMAofG8FWn2LrTI5rPE2S7OEMyYbt4gMHzLt0zJg3PEOy+jtmAg/XfBpf16EN1+iPmFlfXHu+u+XQjetsMWaaGVfxHTNVkOt/acxkSK7T4XlEhmSFaUSG0iGDsPk7ObaJ3r5Pk5Q9S4cMwn8f0jU/h54Gnx2lA4ahdRvXfp9Dz9oIX3lj5xiUM1ygDKWDjYLUplwV24/wd0+sb/Mz9yWMWyvpSKOF1t9kNfe1dVCCdNXMtdrfxTj9R/U9i+z3aU7LTfWKyrqK3qiaQM91RuqUuQbvUZZqdv3hZym9bZ3ul+YaL9cv3MYT6i3CJRs91fmet1JKKaWUUkoppZRSSimllFJKqTppdDu7vMO7uet0a/gWv138ivUrV5uTR2a/ET2pzXUTd6tePb5/+LatuPX1h/xiYs7XTco2aKDE/0Vg6q8Bh11mp76AWdwi7Ig/eVz773KHt5RwDsJCers+OPf+8JYZ0kcRa1hnLMUPUIYD6XBxYe0yF3zlG/IU5uieRLRJlq/HsqqNxI6tyTKsXrvGVoGXO0h89tIhY0Ln617jqmti5tNw9ZnEzBjiWmpiZn1xderFZMh18Fb/WV/4hs/2N4yZm8j1HOIjhtgmQ+KFN9t0z+QIJ8g2XL8DZ8g2Wx8vatjeJ+IPIlfhfVL9AZ0yvrcXSzBDrr3iCzbReywdbgTsJ+JaOtwYyHniq3SwUZDllKyeOQsvv7mK7iuuuTRFbAeJV8JOTTkfwn9CVhuyzz4U+Stwtoq7xHdjiOt0xqpRNW93RVisWbjnQrPNf3Ya2beNF9J93q5dXFUXbL94/bLlcLo7Nk3zuJsO17/3e/cv73Axmfj8hvYAAAAASUVORK5CYII=" alt="settings"></img></button>
                    
                    <p>{Comment.person.name}</p>
                        {oldComment.length>0 && curID===Comment._id ? <div><input id={Comment._id} onChange={(e)=>setOldComment(e.target.value)} value={oldComment}></input><button onClick={()=>updateComment(Comment._id, Comment.commentedIn)}>Save</button></div> : <p className="comment">{Comment.comment}</p>}
                        {makeVisible && person===Comment.person._id && curID===Comment._id ? 
                            <div className="setting-btns">
                            <ul className="setting-ul">
                            {person===Comment.person._id ? <li className="setting-li" id={Comment._id} onClick={()=>editComment(Comment.person._id, Comment._id)}>Edit</li>:<></>}
                        
                            {person===Comment.person._id ?<li className="setting-li" id={Comment._id} onClick={() => deleteComment(Comment.person._id, Comment._id)}>Delete</li> :<></>}
                            
                                </ul>
                        </div>
                        : 
                        <></>
                            
                        }
                        <button id={Comment._id} onClick={(id)=>increaseLikeCount(id)} >like</button>{Comment.likes>0 ? <span>{Comment.likes}</span>: <></>}
                        {/* <input type="text" value="" onChange={(e)=>setReply(e)} ></input> */}
                        {/* <button onClick={()=>postReply(Comment._id)}>Reply</button> */}
                        {/* <button>Show replies</button> */}
                        <br></br>
                        <br></br>
                    </div>
                );
            })}
        </div>
         : 
         <div>
         <h2>No comments yet...</h2>
         <p>Say something to start the conversation</p>
         </div>
         }
        </div>
    );
}

export default ReadReview;