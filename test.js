function greet(name){
    switch(name){
        case 'taro':
            return 'こんにちは';
        case 'john':
            return 'Hello';
        default:
            console.log('登録なし');
            break;
    }
};

greet('taro');
greet('john');
greet('peach');