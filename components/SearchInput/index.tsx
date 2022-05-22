import { useState } from 'react';
import Styles from './Styles.module.css';

type props = {
    mainColor: string;
    onSearch: (SearchValue: string) => void;
}

export const SearchInput = ({ mainColor, onSearch }: props) => {
    const [focused, setFocused] = useState(false);
    const [SearchValue, setSearchValue] = useState('');

    const handleKeyUp = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if(event.code === 'Enter') {
            onSearch(SearchValue);
        }
    }

    return (
        <div className={Styles.container}
             style = {{ borderColor: focused ? mainColor : '#FFFFFF'}}
             >
            <div 
            className={Styles.button}
            onClick={() => onSearch(SearchValue)}
            ></div>
            <input
             type="text"
             className={Styles.input}
             placeholder="Digite o nome do produto"
             onFocus={() => setFocused(true)}
             onBlur={() => setFocused(false)}
             onKeyUp={handleKeyUp}
             value={SearchValue}
             onChange={(e) => setSearchValue(e.target.value)}
             />
        </div>
    );
}