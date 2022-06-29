import React from 'react';

const AddBoard = () => {
    return (
        <>
            <label for="my-modal-3" class="card bg-base-100 shadow-xl image-full cursor-pointer">
                <figure><img src="https://api.lorem.space/image/shoes?w=400&h=225" alt="Shoes" /></figure>
                <div class="card-body">
                    <h3 className='text-lg font-semibold'>Add Board</h3>
                    <div className='w-full h-full flex justify-center items-center'>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                        </svg>
                    </div>
                </div>
            </label>

            {/* modal */}
            <input type="checkbox" id="my-modal-3" class="modal-toggle" />
            <div class="modal">
                <div class="modal-box relative">
                    <label for="my-modal-3" class="btn btn-sm btn-circle absolute right-2 top-2">✕</label>

                    <h3 class="text-lg font-bold">Create new board!</h3>
                    <form>
                        <div class="form-control w-full">
                            <label htmlFor="title" class="label font-semibold">Title:</label>
                            <input type="text" class="input input-sm input-bordered w-full" id='title' />
                        </div>
                        <div class="form-control w-full">
                            <label htmlFor="description" class="label font-semibold">Description:</label>
                            <textarea name="" class="textarea textarea-bordered" id='description' rows="2"></textarea>
                        </div>
                        <div class="form-control w-full">
                            <label htmlFor="deadline" class="label font-semibold">Deadline:</label>
                            <input type="date" class="input input-sm input-bordered w-full" />
                        </div>
                        <input type="hidden" name="createTime" />
                        <button type='submit' className='btn btn-sm w-full mt-4'>Add</button>
                    </form>
                </div>
            </div>
        </>
    );
};

export default AddBoard;