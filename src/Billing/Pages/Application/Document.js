const Document = ({ src, name, description }) => {
  return (
    <div className="flex flex-col">
      <div className="flex gap-2 justify-between px-4 py-5 rounded-xl bg-stone-100">
        <div className="flex flex-col text-sm text-center text-neutral-600">
          <img
            loading="lazy"
            src={src}
            alt={name}
            className="w-8 aspect-square"
          />
          <div className="mt-2">{name}</div>
        </div>
        <div className="flex justify-center items-center self-end px-2 mt-7 w-8 h-8 rounded-3xl bg-slate-500">
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/e26c3fe38d1183a0ed31b3a41a00f1bbd67b7f3f4264dcf95c2481c813f84e09?apiKey=27ec22b9382040ef8580a5e340d3a921&"
            alt=""
            className="aspect-square w-[18px]"
          />
        </div>
      </div>
      <div className="mt-2 text-xs font-medium tracking-wide uppercase text-neutral-400">
        {description}
      </div>
    </div>
  );
};

export default Document;
