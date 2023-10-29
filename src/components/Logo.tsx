interface LogoProps {
  width?: number;
}

const Logo = ({ width }: LogoProps) => {
  return <img alt="StarWars Logo" width={width} src="/logo.svg" />;
};

export default Logo;
