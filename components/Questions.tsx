import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Questions: React.FC = () => {
    const [questions, setQuestions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        const fetchQuestions = async () => {
            try {
                const response = await axios.get(process.env.REACT_APP_GEMINI_API_URL as string);
                setQuestions(response.data);
            } catch (err) {
                setError(err as any);
            } finally {
                setLoading(false);
            }
        };

        fetchQuestions();
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

    return (
        <div>
            <h1>Programming Questions</h1>
            <ul>
                {questions.map((question: any) => (
                    <li key={question.id}>
                        <h2>{question.title}</h2>
                        <p>{question.description}</p>
                        <pre>{JSON.stringify(question.testCases, null, 2)}</pre>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Questions;