export const BookItem = () => {
  return (
    <div className="col-xs-6 col-sm-6 col-md-4 col-lg-3 mb-3">
      <div className="text-center">
        <img
          src="https://picsum.photos/151/233"
          width={151}
          height={233}
          alt="book"
        />
        <h6 className="mt-2">Book</h6>
        <p>John Dou</p>
        <a className="btn main-color text-white" href="#">
          Reserve
        </a>
      </div>
    </div>
  );
};
