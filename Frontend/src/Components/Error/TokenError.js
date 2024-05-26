import Swal from "sweetalert2";

const TokenError=(error)=>{
    console.log(error)
    if(error.response.status==401){
          localStorage.removeItem("user");
          localStorage.removeItem("token");
          Swal.fire({
            title: `${error.response.data.message}`,
            icon: "warning",
            confirmButtonColor: "#3085d6",
            confirmButtonText: "OK"
          }).then((result) => {
            if (result.isConfirmed) {
              window.location.replace("/")
            }
          });
        }
}
export default TokenError;