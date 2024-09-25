const AboutPage = () => {
  const x: unknown = "string";
  console.log("X: ", (x as unknown as string).length);
  return <div>AboutPage</div>;
};

export default AboutPage;
