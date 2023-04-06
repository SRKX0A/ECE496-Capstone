import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { LinkContainer } from "react-router-bootstrap";
import{ axiosDelete } from "../../common/API";
import { OptionType } from "../../common/store";
import { ModalComponent } from "./ModalComponent";

type Props={
    headerValues: OptionType[], 
    list:any[], 
    isEditable?: boolean, 
    isRemovable?:boolean, 
    editLink?:string , 
    deleteString?:string, 
    label?:string, 
    repopulate?:Function
}

export default function PaginationListComponent({headerValues, list, isEditable =true, isRemovable =true, editLink, deleteString, label, repopulate}:Props) {

        const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
        const [deleteId, setDeleteId] = useState<number>(0)

        const deleteModal = (id: number) => {
            setDeleteId(id)
            setShowDeleteModal(true)
        }
    
        const deleteItem = async () => {
            setShowDeleteModal(false)
            try{
                const response = await axiosDelete(`${deleteString}${deleteId}`, {} )
                if(repopulate != null)
                    repopulate()
            }
            catch(e:any){
                alert(e.errors?.Error!)
            }
        }

    return (
        <div>
            <ModalComponent actionFunction={deleteItem} modalTitle={`Delete ${label != null ? label: 'Item'} `} modalText={`Delete ${label != null ? label: 'Item'}?`} 
                    buttonText={"Delete"} showModal={showDeleteModal} setShowModal={setShowDeleteModal}/>
            <table className="table  table-sm  fs--1 mb-0 mt-4 table-hover ">
                <thead className="border-bottom">
                    <tr className='text-center table-header-text'>
                        {isEditable != false && <th className="col-1"></th> }
                        {headerValues.map((e:OptionType) => (
                            <th key={Math.random()}><h4>{e.label}</h4></th>
                        ))}
                        {isRemovable != false && <th className="col-1"></th> }
                    </tr>
                </thead>
                <tbody className="">
                        {list.map((e:any) => (
                            <tr className="table-text text-center" key={Math.random()}>
                                {isEditable != false && 
                                    <td>
                                        <LinkContainer to={editLink!= null ? editLink + `${e.id}` : ''}>
                                            <button className="border-0  btn btn-outline-primary" >
                                                <FontAwesomeIcon icon="cog" />
                                            </button>
                                        </LinkContainer>
                                    </td> 
                                }
                                {headerValues.map((a:OptionType) => (
                                    <td key={Math.random()}>
                                        {typeof(e[a.value!]) != 'boolean' && a.s1 != null && a.s1 != "subdomain" && 
                                            <LinkContainer to={a.s2 + e[a.s1]}>
                                                <a className="h5">{e[a.value!]}</a>
                                            </LinkContainer>
                                        }
                                        {typeof(e[a.value!]) != 'boolean'   && a.s2 != null && a.s1 == "subdomain" && 
                                            <div>
                                                {e[a.s1!] != null && <a onClick={() => window.open("https://" +e[a.s1!]  + a.s2)} className="h5 text-decoration-underline">{e[a.value!]}</a>}
                                                {e[a.s1!] == null && <h5>{e[a.value!]}</h5>}
                                            </div>
                                        }
                                        {typeof(e[a.value!]) != 'boolean' && a.s1 == null && a.s2 == null && 
                                            <h5>{e[a.value!]}</h5>
                                        }
                                        {typeof(e[a.value!]) == 'boolean' && 
                                            <input className="align-bottom " type="checkbox" checked={e[a.value!]} readOnly/>
                                        }
                                    </td>
                                ))}
                                {isRemovable != false && 
                                    <td>
                                        <button className="border-0  btn btn-outline-danger" onClick={() => deleteString!= null ? deleteModal(e.id): null}  >
                                            <FontAwesomeIcon icon="delete-left" />
                                        </button>
                                    </td> 
                                }
                            </tr>
                        ))}
                </tbody>
            </table>
            
        </div>
    )
}