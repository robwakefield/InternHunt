import { useState } from 'react';
import Button from 'react-bootstrap/Button'
function GenerateAnswerButton(props) {
    const [loadingAnswer, setLoadingAnswer] = useState(false);

    const [messages, setMessages] = useState([
        {
            message: "Hello I am ChatGPT!",
            sender: "ChatGPT"
        }
    ])

    function updateEntryValue(value) {
        const updatedEntryValues = [...props.entryValues];
        updatedEntryValues[props.evidence] = value;
        props.changeEntryValues(updatedEntryValues);
        setLoadingAnswer(false);
    }

    const generateAnswer = async (message) => {

        const newMessage = {
            message: message,
            sender: "user"
        }

        const newMessages = [...messages, newMessage]

        setMessages(newMessages)

        setLoadingAnswer(true);
        await processMessageToChatGPT(newMessages);
    }

    const ChatGPT_API_KEY = "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"

    async function processMessageToChatGPT(messages) {
        let apiMessages = messages.map((messageObject) => {
            let role = "";
            if (messageObject.sender === "ChatGPT") {
                role = "assistant"
            } else {
                role = "user"
            }
            return {role: role, content: messageObject.message}
        })

        const systemMessage = {
            role: "system",
            content: "Help me to fill in an application form, Here is my CV: \n" + props.extractedCV + "\n I am applying for " + props.jobName
        }

        const apiRequestBody = {
            "model": "gpt-3.5-turbo",
            "messages": [
                systemMessage,
                ...apiMessages
            ]
        }

        await fetch("https:/api.openai.com/v1/chat/completions", {
            method: "POST",
            headers: {
                "Authorization": "Bearer " + ChatGPT_API_KEY,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(apiRequestBody)
        }).then((data) => {
            return data.json();
        }).then((data) => {
            console.log(data.choices[0].message.content);
            updateEntryValue(data.choices[0].message.content)}
            )
    }

    function createQuestion(requirement) {
        return "By using my CV, write out a paragraph within 100 words to fill in a form to show evidences I have skills in" + requirement;
    }
        
    return (
        <Button
            className = {props.submitted? "invisible" : "visible"}
            disabled={(props.extractedCV == "" || loadingAnswer)}
            variant="primary"
            onClick={() => generateAnswer(createQuestion(props.requirement))}>
            {loadingAnswer? "Loading..." : "Generate Answer from CV"}</Button>
    );
}

export default GenerateAnswerButton;