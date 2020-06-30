package common.publisher

import akka.NotUsed
import akka.stream.scaladsl.Source
import common.graphql.UserContext
import sangria.schema.Action

trait PubSubService[T] {

  /**
    * Publish an event
    */
  def publish(event: T)

  /**
    * Subscribe to the event by specified params.
    */
  def subscribe(eventNames: Seq[String], params: Seq[Param])(
      implicit userContext: UserContext
  ): Source[Action[Nothing, T], NotUsed]
}

trait Param

case class Event[T](name: String, element: T)
