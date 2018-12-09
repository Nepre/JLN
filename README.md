# JLN

En primer lugar rechazamos seguir al pie de la letra los proyectos propuestos por la asignatura (el chat y el baúl) y decidimos ir a por algo un poco más ambicioso. Finalmente optamos por una modificación del baúl en la que en lugar de ser un simple baúl con cifrado también es un editor y gestor de archivos.

La premisa de nuestra aplicación es que puedas crear, modificar o borrar archivos a tu antojo desde dentro de ella y que utiliza Google Drive para subir tus archivos a la nube de manera fácil, accesible y siempre cifrados de manera que solo tu puedas acceder a su contenido de manera completamente privada y segura. De este modo puedes tener tu progreso siempre guardado y a salvo de cualquier amenaza.

Esta aplicación se basa en Google Docs, una aplicación para compartir documentos en tiempo real, pero por problemas tanto de tiempo como de desconocimiento no nos ha sido posible realizar la actualización en la nube en tiempo real. En su lugar hemos implementado un sistema parecido al de GitHub en el cual los usuarios realizan “Push” y “Pull” con el contenido de la carpeta de archivos de la aplicación de modo que esta actualiza (Google Drive en nuestro caso) o es actualizada por el contenido de la nube (Drive).

Los algoritmos de cifrado que se utilizan en la aplicación son AES 512 y RSA 1024, hemos escogido estos dos entre los cientos de algoritmos debido a que su gran capacidad de protección los ha convertido en el estándar de la seguridad en cuanto a cifrado digital.
