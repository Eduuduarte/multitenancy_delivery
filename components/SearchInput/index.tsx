import { useState } from 'react';
import Styles from './Styles.module.css';
import SerarchIcon from './searchIcon.svg';
import { useAppContext } from '../../context/app';

type props = {
    onSearch: (SearchValue: string) => void;
}

export const SearchInput = ({ onSearch }: props) => {
    const { tenant } = useAppContext();

    const [focused, setFocused] = useState(false);
    const [SearchValue, setSearchValue] = useState('');

    const handleKeyUp = (event: React.KeyboardEvent<HTMLInputElement>) => {
       //if(event.code === 'Enter') {
            onSearch(SearchValue);
        //}
    }

    return (
        <div className={Styles.container}
             style = {{ borderColor: focused ? tenant?.mainColor : '#FFFFFF'}}
             >
            <div 
            className={Styles.button}
            onClick={() => onSearch(SearchValue)}
            >
                <SerarchIcon color={tenant?.mainColor}/>
            </div>
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