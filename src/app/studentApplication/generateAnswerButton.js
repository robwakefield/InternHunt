import { useState, useRef } from 'react';
import { Col, Form, Row} from 'react-bootstrap';
import Button from 'react-bootstrap/Button'
import "./studentApplication.css"

function GenerateAnswerButton(props) {
    const [loadingAnswer, setLoadingAnswer] = useState(false);
    const addtionalInformation = useRef();

    const [messages, setMessages] = useState([
        {
            message: "Hello I am ChatGPT!",
            sender: "ChatGPT"
        }
    ])

    function updateEntryValue(value) {
        props.updateEntryValue(props.evidence, value);
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

        await fetch("https://api.openai.com/v1/chat/completions", {
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

    function createQuestion(addtionalInformation, requirement) {
        return "Given that" + addtionalInformation + "\n" + "By using my CV, write out a paragraph within 100 words to fill in a form to show evidences I have skills in" + requirement;
    }
        
    return (
        <div>
            <Row>
                <Col xs={9}>
                    <Form.Control
                        class="form-control input-sm"
                        id="inputsm"
                        type="text"
                        className = {props.submitted? "invisible" : "visible"}
                        placeholder='Optional: Tell the AI more information (I have worked in ...)'
                        ref={addtionalInformation}/>
                </Col>
                <Col xs={3}>
                <Button
                    className = {props.submitted? "invisible" : "visible"}
                    disabled={(props.extractedCV == "" || loadingAnswer)}
                    variant="primary"
                    onClick={() => generateAnswer(createQuestion(addtionalInformation.current.value, props.requirement))}>
                        {loadingAnswer ? "Loading..." : "Generate Answer from CV"}
                </Button>
                </Col>
            </Row>
        </div>
        
    );
}

export default GenerateAnswerButton;