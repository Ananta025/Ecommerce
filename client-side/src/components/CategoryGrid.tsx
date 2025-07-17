type Category = {
  name: string;
  icon: string;
};

export default function CategoryGrid({ categories }: { categories: Category[] }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
      {categories.map((cat) => (
        <div
          key={cat.name}
          className="flex flex-col items-center justify-center rounded-xl bg-forest-soft/60 border border-forest-secondary/20 p-4 shadow-sm hover:bg-forest-light transition-all duration-300 cursor-pointer"
          tabIndex={0}
          aria-label={`Shop ${cat.name}`}
        >
          <span className="text-3xl mb-2">{cat.icon}</span>
          <span className="font-medium text-forest-secondary">{cat.name}</span>
        </div>
      ))}
    </div>
  );
} 