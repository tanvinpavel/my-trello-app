
const AddBoard = ({register, handleSubmit, createBoardHandler}) => {
    return (
        <>
            <label htmlFor="my-modal-3" className="card card-compact p-0 shadow-xl image-full cursor-pointer">
                <figure><img src="https://placeimg.com/400/225/arch" alt="Shoes" /></figure>
                <div className="card-body">
                    <h3 className='text-lg font-semibold'>Add Board</h3>
                    <div className='w-full h-full flex justify-center items-center'>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                        </svg>
                    </div>
                </div>
            </label>

            {/* modal */}
            <input type="checkbox" id="my-modal-3" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box relative">
                    <label htmlFor="my-modal-3" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>

                    <h3 className="text-lg font-bold">Create new board!</h3>
                    <form onSubmit={handleSubmit(createBoardHandler)}>
                        <div className="form-control w-full">
                            <label htmlFor="title" className="label font-semibold">Title:</label>
                            <input type="text" {...register("title")} className="input input-sm input-bordered w-full" id='title' />
                        </div>
                        <div className="form-control w-full">
                            <label htmlFor="description" className="label font-semibold">Description:</label>
                            <textarea {...register("description")} className="textarea textarea-bordered" id='description' rows="2"></textarea>
                        </div>
                        <div className="form-control w-full">
                            <label htmlFor="deadline" className="label font-semibold">Deadline:</label>
                            <input type="date" {...register("deadline")} className="input input-sm input-bordered w-full" />
                        </div>
                        <input type="hidden" defaultValue={new Date()} {...register("createTime")} />
                        <button type='submit' className='btn btn-sm w-full mt-4'>Add</button>
                    </form>
                </div>
            </div>
        </>
    );
};

export default AddBoard;