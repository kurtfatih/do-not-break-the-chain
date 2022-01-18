import { useNavigate } from 'react-router-dom';

export const useNavigateTo = () => {
    console.log('to');
    const navigate = useNavigate();
    const goTo = (path: string) => navigate(path);
    return Object.freeze({ goTo });
};
