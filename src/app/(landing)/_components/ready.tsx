import Link from "next/link";

export const Ready = () => {
  return (
    <div className="center mx-5 flex-col gap-5">
      <h3 className="text-center text-4xl">
        Pronto para criar seu currículo com IA?
      </h3>
      <p className="text-primary/80">
        Junte-se a mais de 3 milhões de pessoas que usam o Rezi para ter
        controle sobre sua busca de emprego.
      </p>
      <Link
        href="/sign-up"
        className="bg-primary px-8 py-4 text-base font-semibold text-secondary duration-300 ease-in-out"
      >
        Cadastrar-se gratuitamente
      </Link>
    </div>
  );
};
