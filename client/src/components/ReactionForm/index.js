import React, { useState } from 'react';
import { ADD_REACTION } from '../../utils/mutations';
import { useMutation } from '@apollo/client';

const ReactionForm = ({ thoughtId }) => {

    const [reactionBody, setBody] = useState('');
    const [charCount, setCount] = useState(0);

    const [addReaction, {error}] = useMutation(ADD_REACTION); 

    const changeHandler = (event) => {
        const target = event.target;

        if (target.value.length <= 280)
        {
        setBody(target.value);
        setCount(target.value.length);
        }
    };

    const submitHandler = async (event) => {

        event.preventDefault();
        try {
            // add thought to database
            await addReaction({
                variables: {reactionBody , thoughtId  }
            });
        setBody('');
        setCount(0);
        }  catch (e) {
            console.error(e);
        }


    }

    return (
        <div>
            <p className={`m-0 ${charCount === 280 ? "text-error" : ""}`}>
                Character Count: {charCount}/280
            </p>
            {error && <span className="ml-2">Something went wrong...</span>}
            <form onSubmit={submitHandler} className="flex-row justify-center justify-space-between-md align-stretch">
                <textarea
                    placeholder="Leave a reaction to this thought..."
                    className="form-input col-12 col-md-9"
                    onChange={changeHandler}
                    value={reactionBody}
                ></textarea>

                <button className="btn col-12 col-md-3" type="submit">
                    Submit
                </button>
            </form>
        </div>
    );
}

export default ReactionForm;