interface SearchBarProps {
  city: string;
  setCity: (city: string) => void;
  onSearch: () => void;
}

export function SearchBar({
  city,
  setCity,
  onSearch,
}: SearchBarProps) {
  return (
    <div>
      <input
        type="text"
        placeholder="Digite uma cidade"
        value={city}
        onChange={(event) => setCity(event.target.value)}
      />

      <button onClick={onSearch}>
        Pesquisar
      </button>
    </div>
  );
}