import Styled from './styles';

const TextInputComponent = (props) => {
  const { label, onChangeText, onError } = props;

  // WIP
  if (onError) {
    return (
      <Styled.ErrorInput style={{ backgroundColor: '#FFFFFF' }} label={label} onChangeText={onChangeText} {...props} />
    );
  }
  return (
    <Styled.TextInput style={{ backgroundColor: '#FFFFFF' }} label={label} onChangeText={onChangeText} {...props} />
  );
};

export default TextInputComponent;
