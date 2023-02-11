import Typewriter from "typewriter-effect";

type AppProps = {
  text: string[];
};

const Jumbotron = ({ text }: AppProps) => (
  <Typewriter
    options={{
      strings: text,
      autoStart: true,
      loop: true,
    }}
  />
);

export default Jumbotron;
