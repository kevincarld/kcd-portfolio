const mockData = [
  {
    img: "https://placehold.co/600x400/c00c00/fff",
    title: "Project 1",
    category: "Website Development",
    stack: "React, Next.js, Tailwind CSS",
  },
  {
    img: "https://placehold.co/600x400/c00c00/fff",
    title: "Project 2",
    category: "Website Design",
    stack: "React, Next.js, Tailwind CSS",
  },
  {
    img: "https://placehold.co/600x400/c00c00/fff",
    title: "Project 3",
    category: "Website Development",
    stack: "React, Next.js, Tailwind CSS",
  },
];
export default function SelectedWorks() {
  return (
    <section className="container py-10">
      <div className="container-sm px-0 mb-4">
        <h2 className="text-lg text-black dark:text-white">Selected Works</h2>
      </div>

      <div className="grid grid-cols-1 space-y-14">
        {mockData.map((item, index) => (
          <div key={index}>
            <a href="#">
              <figure>
                <img
                  className="aspect-video rounded-2xl w-full object-cover"
                  src={item.img}
                  alt={item.title}
                />
              </figure>
            </a>

            <div className="flex justify-between mt-4">
              <div>
                <h3>{item.title}</h3>
                <h4 className="text-sm">{item.category}</h4>
                <p className="text-sm">Stack: {item.stack}</p>
              </div>

              {/* <h4>{item.category}</h4> */}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
