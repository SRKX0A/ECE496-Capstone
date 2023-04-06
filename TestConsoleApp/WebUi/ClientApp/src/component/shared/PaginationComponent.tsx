import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

export function PaginationComponent ({pageNumber,pages, maxPageNumber, setPageNumber }: 
    {pageNumber:number, pages: number[], maxPageNumber: number, setPageNumber:(value: React.SetStateAction<number>) => void  }) {

    return(
        <div>
            {<div className="mr-3 mb-3 mt-5 pagination float-end ms-auto ">
                <button className='btn btn-falcon-default btn-sm me-1 me-sm-2 list-add-btn-text' disabled={pageNumber == 1} onClick={() => setPageNumber(pageNumber - 1)}>
                    <FontAwesomeIcon icon="chevron-left" type="button" />
                </button>
                {pages.map((page: number) => (
                    <div key={page}>
                        {( page == 1 || page == pageNumber - 1 || page == pageNumber || page == pageNumber + 1 || page >= maxPageNumber ) && 
                            <div className={page == pageNumber ? 'active page-item' : 'page-item'} key={page} >
                                <a style={{color:`${page == pageNumber ? "white":""}`}} className='page-link list-add-btn-text' onClick={() => setPageNumber(page)}>{page}</a>
                            </div>
                        }
                        {((page == pageNumber + 2 && page < maxPageNumber) || (page == 2 && page != pageNumber -1 && pageNumber > 2  )) && 
                            <div className="page-item ms-2 me-2">
                                <p>..</p>
                            </div>
                        }
                    </div>
                ))}	
                <button className='btn btn-falcon-default btn-sm ms-1 ms-sm-2 list-add-btn-text' disabled={pageNumber == maxPageNumber || maxPageNumber == 0} onClick={() => setPageNumber(pageNumber + 1)}>
                    <FontAwesomeIcon icon="chevron-right" type="button" />
                </button>
            </div>}
        </div>
    )
}