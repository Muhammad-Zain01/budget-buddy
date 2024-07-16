type ComponentProps = {
  type: string;
};

const AuthIllustration: React.FC<ComponentProps> = ({ type }) => {
  return (
    <div className="flex">
      {type === "register" && (
        <img src={"/illustrations/two.svg"} alt="sign_up" className="p-20" />
      )}
      {type === "login" && <img src={"/illustrations/two.svg"} alt="sign_in" />}
    </div>
  );
};

export default AuthIllustration;
