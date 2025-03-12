function Contact() {
  return (
    <div>
      <h1 className="text-3xl font-heading font-bold mb-4 text-center border-b-2 border-kilsvart">
        Kontakt oss
      </h1>
      <p className="mb-4 text-lg font-body font-normal">
        <a
          href="mailto:post@kilhandball.no"
          className="text-kilsvart font-semibold hover:underline"
        >
          post@kilhandball.no
        </a>
        .
      </p>
      <p className="mb-4 text-lg font-body font-normal">
        Markensvegen 20, 2212 Kongsvinger
      </p>
    </div>
  );
}

export default Contact;
