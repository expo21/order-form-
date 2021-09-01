const express = require("express");

const router = express.Router();

var pdf = require("html-pdf");
const fs = require("fs");
const { getOrderById } = require("../controller/order.controller");
let logoPath = "../assests/logo.png";
router.get("/getDoc/:orderId", async (req, res) => {
  try {
    //fetch order details

    //create pdf
    var options = {
      format: "A4",
      zoomFactor: 1,
      orientation: "portrait",
      type: "pdf",
      quality: "100",
    };
    const order = await getOrderById(req.params.orderId);
    if (order !== null) {
      const stream = await new Promise((resolve, reject) => {
        pdf
          .create(
            // `<p>this is my pdf</p>`,

            `<div style="background: #eee;">
                <div style="max-width: 1080px; width: 100%; background: #fff; padding: 20px 50px; height: 94vh;">
                <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOcAAADaCAMAAABqzqVhAAAAbFBMVEX///8Eqm0Ap2cApWMApGCMzq8ApGGu3MbM6dsZrnSc07kApmYAo11jwJb3/PovsnzX7ePr9vGV0bU9tIHf8elavZDC5NSEy6pqwpq03spJuIe74c97yKRzxZ/n9e/P6dya1LoAnE6Qz7JSu4yaE5g+AAAO70lEQVR4nO1d6WLivA4lTgiEmABlL0u55f3f8QbwIm+Jldil0y/n10wJtmUrko5smdHo38b1Y9aOj9W7h9kbX5S0gy7fPcze+MqTdqSDnP8KBjn/g3Lm/xE5sz/gVzzkpNN3j7I/pjS3gRRgNSfvHmQ8VFLOdP/uwcTDiggxyfzdg4kHKOb63YOJiETKmbx7LBGxlmKm/75HcWJeSo/y7wcITnxLj0pP7x5MPJyoEDP/ePdg4mEpxSwv7x5MPFTy3SSfyie3MQ77CtMvsnGGW2c5C2lqC/WTk0+CBSDHhFFHZOM8n/PVUcw7CBD09QDexgv06t8vsmmBRTcxz6loIdvoH4I31wtk693vR9nenBX5sYuYk0w0QHfmxwfkrGe+WlVl7Y05QDqIOZULRm6Wz1fY4fhq1aWr2tY+Ae/6rpBxl8nhaBjMMVK9PLVqg3whFGQos16j0hogKZ3rioeed6+eP3uImRCsk7eYU5KtVWs0SS09NcBLq3bd384HqGEwm2FfK6p6wcL6kBs+WoVtU8dnexcQN/vLl67hUKfIuffQKqyOGMgsrqEBLuNOEijoHRsstGpVV9cpUbR1oeLsEIHAdq5Y29imVfvuPoUjxeUjryzGNAW9e8yGCy1aterjU4SgKDlH3+cal/k6zUpVGOgHK5/8PUSzVm37L2e9EB0zr9fJJ1X6h9HVDGk3GrXqK8Ry1lagcxZrs1Wioxn4CDuIJq1aBBETQxkMTOBUQ+U7ITW3QauO2JfAhc5EtMYOCKqwNDQRdWpVICmTzkT0ibGUp4QvWTAi2pl2muhGRBmkxVHjmjl2Qe1ahTbdjeghJ/CVirtHOz27VvWgnSY6EFGBo1xQ1QuOkSO0alUv2mkCTUQl4F63+kkIItqLdppAE1GJpVPOAES0J+00gSWiYChSGv0N609E+9JOE0giKiFfQ8M19CaivWmniTYienMllMEwjZgG+3bpWhXOdUo0U4YNJfZdTjDlpWEw0dZS1aoAtNNEMxGtY2k6s/wd5jktoRvW+ylaFYR2migbxPx4rFq6NozVFcphcfS9iCg2ovJEA2VgiRBCD1oKExoaq0I4EmdOgEawEbI33JRhwWeWZOsJN0irSaGYQ7s+YAdRmp2GhvOw0w3IQ8qM3C/nyzbJ1KVKba9vTUSRrkFoFZbBIuA4OGKk76yJMJe9xmYDuFZ1lsIDdsrgpUDOgApNRF9ahX2xUbAT0U3ZLih1eyU0EX1oVVjaacI60lXRNrnZt1PMbkQ0KO004SKil+ax0ptbTHxYk5/wgRR2WnIHEZ0mbrtJ8pbYGP2qje7IL6TYhLGbiM6IvSmSbdtIOpZ2EGwCnpzRM9NARCdFZvRP6NojKxqeRqqotTDo3tVyXNCU+05C0izZe/Hz4GkBFeltFH7vane73BdFUqzn46P3IafAaR4djy4C7111Q+C0nYr8dTB21p0yhENEfygO56O/GEHOHqe52iCi8oB7V90RcJtEG61kWeH2rnogjpTKYDtShrAIto2pjXUM+uhEGUIj0La0LifsItDeVT8EOmagQnMO2L2rNEatRpBjIxp0Zx/nECUOEfKxmV50it67ukUQNHx+3QzGsZTBRUR7IfS2kIVcRThEiUfg/S/rGAMS0e4IS0StOhf8EGUXBCWiDhuCJqIxCuiDElF7F3+NiDp9fI+9q3AIR0TdMRu2paYd0a4IRkQbYnA0ER07m+qOQES0kVNhtxR/MRFtHNrfIaItOY8/Q0RbTAeWMkS56OKrvylqdQUd9q7Coz8RbXftv4GIokNQHR5VVH+CiPqE3n+AiHpRKTQRPUeQE7stq47Ijxr3PUQZBH2IqOfhbzRluLe3iUYPIup9mB9LGfIYRBS7FyLhvc2Fpgy/iogiim1+BRHFXijBgdkqwLb9i3ZEve/PeAB9iDIGEf3uQkSRxY1dD1EGRRfFxdxvM/olRHSCJ6LorfZ/lIim2CD03ySijjPbTcBShuw3ENEujhx7fU4M2oIkosjLO17AEdEoNBS5F9Lx3cFRhsACMlSYye5InDCUIUqa6AEEESWHjn0giGiM8ycv+I+hc82xP2WIeCPqzjdYKBtKDVrgS0Sj3srsS0R7cAnfHdEo0S2HZwia9+GGfntXUc5vSvgR0X4WwmsqY2yDAngRURTtNOGzdxUlmwDhQUT73KnzhAdliJEdUuFRvoajnSbarUCnoBKH1hA0QK68lTLEOEako02r0LTTRBsRjZKN19GyF9KBdppoJqJRjvmZaLnZMEgfjdaux0U2GDQS0UAkoskK9LmYCIUGIhosZdNARGMkqK1oCEGDkQg3Ee11cRgOTiLamXaacBLReLTThHM5w5EIFxHtGVTi4DiUV4bc8rAT0d5BJQ52IhrUQtgpQ1TaacIaggYmETYiGpl2mrDthYQmEZYukBfj9ofliv3gZ9dNIhokqMTBuGKfhD8CYlCG+LTThK5VvWmnCb2ar+2OiyjQQtAoR7RUIvqmX15TQ9Aoe1cqEf0R2mlCIaKRLAQkogGDShyU6rA4XcC9qx+inSYAEY22dyWtQI+9jL4QRDSihRBW4MdopwlBRGPuXTErED0z3QR2TUnUvStGRH+SdppgyxmTRLyIaJSCSH88iWiUk3YSDyIaIajE4UFEI1uIBxGNEFTiUBPR6Bbio4wSVOIwJz+wdxUlqMRh9b/4FmLyG3629A//3u+AAQMGDBgwYMCAAQMGDBgwYMCAAQzT3bTG7qd3BVbPbqe7H0tfJ3n6QKRtXiem9Nltwy/mBAbbnvzpAy/T1/ZvOcgZGIOcUTHIGQmDnFExyBkJg5xRMcgZCYOcUTHI2Yjqem09uWJ/RpdztWlvabS6rrwOytTPOT5pktPxrWp2T7Ma6X3mZK3T/Tp7Yj3WyrsUOSf3PMtzSg4N5/VPl4LWDVFyvzUdA19N5snzuWQ+scyJS87dpf5WntHFXmf+ZyoKNEq6tc7EB8nF8W2SF0rbQM5ZmoqHErukq3OWyqbo2jUfyy0Vv0tLSjo3ZsQu5zERA62HAI8+L9UfKSYWgj5JtUqVvADdCjmrhVL/QG0n1b6pWgxC8rVNhaq5/hw9aGtqlXOr1g5l8uzj1CgTM34w/m4pDQSzIeQstHqW1CgW12bCaIpjafmBaELUk8w2OY0L9wk/s2spntKORlf68NlDN03OhVnLnGkSrCzDfzSlH3vf2Qs/qfLCWeS0XLpQXtSPSG2IuGYT5eCyXUywDPz4uuU59fBh5SrqzlQNcl6GoSyAKacodC5rW8jftFfFC69XIOtdVS0v7MEMvH2f0mg8bTKfjPTOZVCKdR5dSN1Ujx+vgSl7tCRfekUAMB2v58D/wbyZcvI6ZzK5VtcZX7RnGeWE9cXe14nxXXnZZHbY1aa4+ho/lY9KCYCc2X2yXF1P0hrA88cz3hTJ91/1gK+ThXzxwXOi3rJMHn6nWn4IVYGlvIacFVuz8uUxVuxLT3/Hin1yvoBF+viR+FxYSlEkk35Kf7Onyi0qsuyi4MsiNCiVvlY2JX8IWZQ9glomobVgKvfib7I9Q87lqzGhQ7PsIQuhj38z2yHqfE7fHzW+hd/hBbWp4iNOBPoC8X6C15oLSuSxWf77rSmsx90Ifyv+xC0Ghc7vyAUFjsIhZ8kvHdg8Zfl4iv39atT5mz4WfTHA5cxhhMFunQLlHoW1KV73KEbA6+aeP1YscWMTIusqDDmvmd6lBL9BuLSHJUu2LI2HtrkAis1hkytrTjbcxmlNMY0SFXLcYujFKqzgVYpl2qHUpnsv8He3jnD2FlF5EU5j6TeTM1cjM26W+f/Z+I3j/NyBc8Vldwmk+pUXbEVkxaAp50H4yMNEj17P0G183rTiKdZp3lhTxeTM1L8yfyT+yjpKjW21tbrOC/uyj0ZsPgQtMuWU90qQMqvXTWkCuvfa0pI9nAl9sE1yavxzrn11q1k8AWbyUzaXur4b8+GWc7SHASpJ6RZMqh6LEQqUlJsYHzm1kelysiDBvBWAvRvcA7E1MQ3fXJsoW3x7UKNYkgGSUG01alAWYs5/Qk724nKFdhrNg4eco0mmxZYUWJ2vu6R6z06ECjJdab6awU9OVvlrvgLfqg14raelmpTdYUX5/+38sxoDpvx8HtqWmrqnuZS15KrLB9u4N+4nJzdpBl/mDzK7kLimlo+uWc4au30BqLyhjMvZVmQDuHKwuW7ONfnJyeLq0ihWZ7YjZ/9l9irX797hDlkERI35odO54BpseKiRLIXm0cmO/b8xl+cn51dub0pjEqObFjdwMH2QgWRbvm/JLII1lmOCidiGDU4LwrrIKaIVdUE5CRPrzOMmrQ6aR/eZ+HN7XlNa0dNi/QCYO2bueMaD33SkUvlKiY885eQRSaYIwOktNWx8Aj1txf8o1UGXsyqesiyk/z+LIbxuJybypWc3G4noTIQYMImzSfJPMAhPOUVTgNNVXEygpke28CSR1u/KoxlQaGqs5+uFBHekzYUrY+RAxq9n3VqIq6tynoHcXOhjENJuesopL87N5q8lrWbCxMPybrGgGYvNrnvh/sHbbcjJ76wQE5vJgbFoMr8816e6sLmUiROZxCBp+nk5zxNmx6iYN185K5EnIXkyP1/WmfhDDl9amR4iWXE4Hwrp+wHNNuXkRrR4PXRkrT9tjeDDdH04LHhgBL00TEo96Ln4j0h/+sqppFBhS3qJ+S13PJfDYlfTDgnVS+aXu/CRL1WRN2VCEaAzdyQZ5Vx4yzmatDXFcLbfJZcrnM6S75OKIGXh6QtL2lJLHH/l5iNJKu+f9ZdzdLIJmpsXBoxtz1H17gKLXxmbyehSNL7WJo9QPYBYfRrzC/tEyDnaFHpCnsiEN8Cu1OeWEC0PYPOfN31+MuAyZyCRWnd7t2wknQq4piT7hIr90giiy1nKbBvEjMDYk9C5Y99vnwFRa95spDSmr3SeeoH7cgGzvepGUt33gqb1sMo0S86O1MH0QjL2DNGemW8fuGuB2vf88IAl6Dpu87xuqixTWny7GUI1W9Pnc2lO15aNweX91a+WwtvNM/atbGtm96rpcTab7BoL56+75zMhzvVudpPZ5PjVttNbLU/1cyfsTTivbwGV+z8wWca8MxLpPAAAAABJRU5ErkJggg==" alt="logo" width="300px" style="margin: 0 auto; display:block;" />
              <h3 >Order Details</h3>

              <div class="step1" style="display:flex; border-top: 2px solid #000;"> 
  			<div class="step-left" style="width:50%;display:flex">
  				<p style="width:50%; margin:8px 0px 8px;"><b>Order Number:</b></p>
  				<p style="width:50%; margin:8px 0px 8px;">${order.order_number}</p>
  			</div>
  			<div class="step-right" style="width:50%;display:flex">
  				<p  style="width:50%; margin:8px 0px 8px;"><b>Customer Name:</b></p>
  				<p  style="width:50%; margin:8px 0px 8px;">John Wick</p>
  			</div>
  		</div>

  		<div class="step1" style="display:flex"> 
  			<div class="step-left" style="width:50%;display:flex">
  				<p style="width:50%; margin:8px 0px 8px;"><b>Phone Number:</b></p>
  				<p style="width:50%; margin:8px 0px 8px;">1234567890</p>
  			</div>
  			<div class="step-right" style="width:50%;display:flex">
  				<p  style="width:50%; margin:8px 0px 8px;"><b>Gender:</b></p>
  				<p  style="width:50%; margin:8px 0px 8px;">Male</p>

  			</div>
  		</div>

  		<div class="step1" style="display:flex"> 
  			<div class="step-left" style="width:50%;display:flex">
  				<p style="width:50%; margin:8px 0px 8px;"><b>Email:</b></p>
  				<p style="width:50%; margin:8px 0px 8px;">Hello@gmail.com</p>
  			</div>
  		</div>

  		<div class="step1" style="display:block; border-bottom:2px solid #000;"> 
  			<div class="step-left" style="width:50%;display:flex">
  				<p style="width:50%; margin:8px 0px 8px;"><b>Address:</b></p>
  				<p style="width:50%; margin:8px 0px 8px;">faskdsdfsdf dsfasjdfsd</p>
  			</div>
  		</div>
		
		
		<h3 style="margin-bottom:0px;"><u>Order Details</u> (all details applicable for the given order)</h3>
		<div class="step1" style="display:flex;"> 
  			<div class="step-left" style="width:50%;display:flex">
  				<p style="width:50%"><b>Garment:</b></p>
  				<p style="width:50%">Denim Pant</p>
  			</div>
  			<div class="step-right" style="width:50%;display:flex">
  				<p  style="width:50%"><b>Order Type:</b></p>
  				<p  style="width:50%">Ready</p>
  			</div>
  		</div>
		<div class="step1" style="display:flex; border-top:2px solid #000;"> 
  			<div class="step-left" style="width:50%;display:flex">
  				<p style="width:50%"><b><u>Accessories (e.g. for Pant)</u></b></p>
  				
  			</div>
  			<div class="step-right" style="width:50%;display:flex">
  				<p  style="width:50%"><b><u>Measurements (e.g. for Pant)</u></b></p>
  				
  			</div>
  		</div>
		<div class="step1" style="display:flex;"> 
  			<div class="step-left" style="width:50%;display:flex">
  				<p style="width:50%; margin:8px 0px 8px;"><b>Front Pocket:</b></p>
  				<p style="width:50%; margin:8px 0px 8px;">FP1</p>
  			</div>
  			<div class="step-right" style="width:50%;display:flex">
  				<p  style="width:50%; margin:8px 0px 8px;"><b>Length:</b></p>
  				<p  style="width:50%; margin:8px 0px 8px;">51</p>
  			</div>
  		</div>





             
            </div>
            </div>
                `,
            options
          )
          .toStream((err, stream) => {
            if (err) {
              reject(reject);
              return;
            }
            resolve(stream);
          });
      });
      const fileName = `${order._id}.pdf`;
      const pdfPath = `${__dirname}/PDFs/${fileName}`;
      await stream.pipe(fs.createWriteStream(pdfPath));
      const file = `${__dirname}/PDFs/${fileName}`;
      if (file) {
        res.download(file);
      }
    } else {
      res.send({ status: false, message: "Order is not placed with this id." });
    }
  } catch (error) {
    res.send({
      status: false,
      message: "Something thing went wrong. Please try later.",
    });
  }
});

module.exports = router;
