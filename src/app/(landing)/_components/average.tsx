export const Average = () => {
  return (
    <div className="center mx-5 flex flex-col justify-between gap-10 md:flex-row md:gap-40">
      <div className="text-center">
        <p className="text-lg">Total de Usuários (isso é chato de atualizar)</p>
        <p className="text-4xl font-semibold text-[#603813]">3,049,450</p>
      </div>
      <div className="text-center">
        <p className="text-lg">Taxa de Entrevistas</p>
        <p className="text-4xl font-semibold text-[#603813]">62.18%</p>
      </div>
      <div className="text-center">
        <p className="text-lg">Avaliação Média dos Usuários</p>
        <p className="text-4xl font-semibold text-[#603813]">8.23/10</p>
      </div>
    </div>
  );
};
