import { IoArrowBack } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { RiMoneyDollarCircleFill } from "react-icons/ri";
import { IoShareSocialOutline } from "react-icons/io5";
import useTransaction from "../../hooks/useTransaction";

import { useParams } from "react-router-dom";

import "./comprobanteDePago.css";
import { formatNumber } from "chart.js/helpers";
import { useEffect } from "react";
import { useState } from "react";

export default function TransactionDetails() {
  const { id } = useParams();
  const [receipt, setReceipt] = useState(null);
  const { verifyTransaction } = useTransaction();

  const navigate = useNavigate();
  useEffect(() => {
    verifyTransaction((data, error) => {
      if (error) {
        navigate("/");
        return alert("La transaccion no existe.");
      }
      setReceipt(data.data);
    }, id);
  }, []);
  return (
    <div className="container-comprobante">
      <IoArrowBack
        className="back-icon"
        onClick={() => navigate("/lobby")}
        size={30}
      />

      <div className="comprobante">
        <header className="comprobante-header">
          <RiMoneyDollarCircleFill size={60} />
          <IoShareSocialOutline className="share-icon" size={25} />
          <h2>Comprobante de AppBank</h2>
          <p className="comprobante-subtitle">Detalles de la transaccion</p>
        </header>

        {receipt ? (
          <div className="comprobante-details">
            <div className="comprobante-item">
              <span className="comprobante-label">Comprobante:</span>
              <span className="comprobante-value">{receipt.id}</span>
            </div>
            <div className="comprobante-item">
              <span className="comprobante-label">Referencia1:</span>
              <span className="comprobante-value">{receipt.reference1}</span>
            </div>
            <div className="comprobante-item">
              <span className="comprobante-label">Referencia2:</span>
              <span className="comprobante-value">{receipt.reference2}</span>
            </div>
            <div className="comprobante-item">
              <span className="comprobante-label">Fecha:</span>
              <span className="comprobante-value">
                {new Date(receipt.createdAt).toLocaleString()}
              </span>
            </div>
            <div className="comprobante-item">
              <span className="comprobante-label">Para:</span>
              <span className="comprobante-value">{receipt.reference3}</span>
            </div>
            <div className="comprobante-item">
              <span className="comprobante-label">Descripcion:</span>
              <span className="comprobante-value">{receipt.description}</span>
            </div>
            <div className="comprobante-item">
              <span className="comprobante-label">Monto:</span>
              <span className="comprobante-value">
                $ {formatNumber(receipt.amount)}
              </span>
            </div>
            <div className="comprobante-footer">
              <p className={`comprobante-status ${"pagado"}`}>{"Pagado"}</p>
            </div>
          </div>
        ) : (
          <div className="box-loader">
            <span className="loader form-loader"></span>
          </div>
        )}
      </div>
    </div>
  );
}
