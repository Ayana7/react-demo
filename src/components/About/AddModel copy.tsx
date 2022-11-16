interface PropsType {
    msg?: string;
}
const AddModelCopy: React.FC<PropsType> = ({ msg }) => { //{msg}相当于解构赋值，从props中解构
    return (
        <h1>hello,{msg}</h1>
    )
}

export default AddModelCopy;